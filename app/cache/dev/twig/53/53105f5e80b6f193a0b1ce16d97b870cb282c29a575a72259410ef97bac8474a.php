<?php

/* @Framework/Form/checkbox_widget.html.php */
class __TwigTemplate_c2d4da6a196e93edc7081a26db9c98bc39db118ca52b126a4eeeec14912b9c81 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_8cbf779a9f9ab3011876b001737a79b22e95904cc3270dd49e087131e3b49328 = $this->env->getExtension("native_profiler");
        $__internal_8cbf779a9f9ab3011876b001737a79b22e95904cc3270dd49e087131e3b49328->enter($__internal_8cbf779a9f9ab3011876b001737a79b22e95904cc3270dd49e087131e3b49328_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/checkbox_widget.html.php"));

        // line 1
        echo "<input type=\"checkbox\"
    <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>
    <?php if (strlen(\$value) > 0): ?> value=\"<?php echo \$view->escape(\$value) ?>\"<?php endif ?>
    <?php if (\$checked): ?> checked=\"checked\"<?php endif ?>
/>
";
        
        $__internal_8cbf779a9f9ab3011876b001737a79b22e95904cc3270dd49e087131e3b49328->leave($__internal_8cbf779a9f9ab3011876b001737a79b22e95904cc3270dd49e087131e3b49328_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/checkbox_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="checkbox"*/
/*     <?php echo $view['form']->block($form, 'widget_attributes') ?>*/
/*     <?php if (strlen($value) > 0): ?> value="<?php echo $view->escape($value) ?>"<?php endif ?>*/
/*     <?php if ($checked): ?> checked="checked"<?php endif ?>*/
/* />*/
/* */
