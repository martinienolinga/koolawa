<?php

/* @Framework/Form/choice_widget_expanded.html.php */
class __TwigTemplate_be43284192836d7924016eaf0f17d25dcae9cdf60b1e78761c8550e9e163c681 extends Twig_Template
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
        $__internal_b94863410c81432666b84f38ca457d8762c97c8e9afc3b894ecdf9a9d09e9cca = $this->env->getExtension("native_profiler");
        $__internal_b94863410c81432666b84f38ca457d8762c97c8e9afc3b894ecdf9a9d09e9cca->enter($__internal_b94863410c81432666b84f38ca457d8762c97c8e9afc3b894ecdf9a9d09e9cca_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/choice_widget_expanded.html.php"));

        // line 1
        echo "<div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
<?php foreach (\$form as \$child): ?>
    <?php echo \$view['form']->widget(\$child) ?>
    <?php echo \$view['form']->label(\$child, null, array('translation_domain' => \$choice_translation_domain)) ?>
<?php endforeach ?>
</div>
";
        
        $__internal_b94863410c81432666b84f38ca457d8762c97c8e9afc3b894ecdf9a9d09e9cca->leave($__internal_b94863410c81432666b84f38ca457d8762c97c8e9afc3b894ecdf9a9d09e9cca_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/choice_widget_expanded.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/* <?php foreach ($form as $child): ?>*/
/*     <?php echo $view['form']->widget($child) ?>*/
/*     <?php echo $view['form']->label($child, null, array('translation_domain' => $choice_translation_domain)) ?>*/
/* <?php endforeach ?>*/
/* </div>*/
/* */
