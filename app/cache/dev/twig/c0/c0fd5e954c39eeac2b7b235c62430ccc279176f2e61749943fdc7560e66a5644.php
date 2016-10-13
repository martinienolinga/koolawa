<?php

/* @Framework/Form/form_row.html.php */
class __TwigTemplate_51650b7535b87ed1a9efcc86e71d61ca05fca8fa9a93a208b8b18d80b03b349c extends Twig_Template
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
        $__internal_b3dbb494ab7ffb3f2ba865ce80e35cad25b498f66cda0ab8e93a706a7eece4fa = $this->env->getExtension("native_profiler");
        $__internal_b3dbb494ab7ffb3f2ba865ce80e35cad25b498f66cda0ab8e93a706a7eece4fa->enter($__internal_b3dbb494ab7ffb3f2ba865ce80e35cad25b498f66cda0ab8e93a706a7eece4fa_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_row.html.php"));

        // line 1
        echo "<div>
    <?php echo \$view['form']->label(\$form) ?>
    <?php echo \$view['form']->errors(\$form) ?>
    <?php echo \$view['form']->widget(\$form) ?>
</div>
";
        
        $__internal_b3dbb494ab7ffb3f2ba865ce80e35cad25b498f66cda0ab8e93a706a7eece4fa->leave($__internal_b3dbb494ab7ffb3f2ba865ce80e35cad25b498f66cda0ab8e93a706a7eece4fa_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div>*/
/*     <?php echo $view['form']->label($form) ?>*/
/*     <?php echo $view['form']->errors($form) ?>*/
/*     <?php echo $view['form']->widget($form) ?>*/
/* </div>*/
/* */
